import { Documento } from './../../../interfaces/diretorio';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DiretorioService } from '../../../core/services/diretorio.service';
import { Diretorio } from '../../../interfaces/diretorio';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UserFolderUploadComponent } from './user-folder-upload/user-folder-upload.component';
import { UserDocumentUploadComponent } from './user-document-upload/user-document-upload.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public codigo: string,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {}
}

export class DiretorioDynamicFlatNode {
  constructor(
    public item: Diretorio,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {}
}

@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ['Fruits', ['Apple', 'Orange', 'Banana']],
    ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']],
  ]);

  rootLevelNodes: string[] = ['Fruits', 'Vegetables'];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    console.log('DynamicDatabase.getChildren')
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}

@Injectable({providedIn: 'root'})
export class DiretorioDatabase {
  diretorios: Diretorio[] = [
    {
      codigo_diretorio: '1',
      codigo_proprietario: 'owner1',
      nome_diretorio: 'Root',
      codigo_diretorio_pai: '',
      caminho_diretorio: '/',
      sub_diretorios: [
        {
          codigo_diretorio: '2',
          codigo_proprietario: 'owner1',
          nome_diretorio: 'Fruits',
          codigo_diretorio_pai: '1',
          caminho_diretorio: '/Fruits',
          sub_diretorios: [
            {
              codigo_diretorio: '3',
              codigo_proprietario: 'owner1',
              nome_diretorio: 'Apple',
              codigo_diretorio_pai: '2',
              caminho_diretorio: '/Fruits/Apple',
              sub_diretorios: [],
              documentos: []
            }
          ],
          documentos: []
        },
        {
          codigo_diretorio: '4',
          codigo_proprietario: 'owner1',
          nome_diretorio: 'Vegetables',
          codigo_diretorio_pai: '1',
          caminho_diretorio: '/Vegetables',
          sub_diretorios: [
            {
              codigo_diretorio: '5',
              codigo_proprietario: 'owner1',
              nome_diretorio: 'Onion',
              codigo_diretorio_pai: '4',
              caminho_diretorio: '/Vegetables/Onion',
              sub_diretorios: [],
              documentos: []
            }
          ],
          documentos: []
        }
      ],
      documentos: []
    }
  ];

  /** Initial data from database */
  initialData(dados: Diretorio[]): DynamicFlatNode[] {
    //this.diretorios = dados;
    return this.diretorios[0].sub_diretorios.map(dir => new DynamicFlatNode(dir.nome_diretorio, dir.codigo_diretorio, 0, this.isExpandable(dir.codigo_diretorio)));
  }

  getChildren(node: string): Diretorio[] | undefined {
    const directories = this.findSubDirectoryById(node, this.diretorios[0]);

    if(directories!?.length > 0){
      console.log('encontrou sub diretorios')
      directories!.forEach(element => {
        console.log(`SubPasta: ${element}`)
      });
    }
    else
    {
      console.log('sub diretorios não encontrados')
    }
    return directories ? directories : undefined;
  }

  isExpandable(node: string): boolean {
    const directory = this.findDirectoryById(node, this.diretorios[0]);
    return directory ? directory.sub_diretorios.length > 0 : false;
  }

  /*private findDirectoryByName(name: string, dir: Diretorio): Diretorio | undefined {
    if (dir.nome_diretorio === name) {
      return dir;
    }
    for (const subDir of dir.sub_diretorios) {
      const found = this.findDirectoryByName(name, subDir);
      if (found) {
        return found;
      }
    }
    return undefined;
  }*/

  private findDirectoryById(codigo: string, dir: Diretorio): Diretorio | undefined {
    console.log(`Pesquisando pasta de codigo: ${codigo}`)
    if (dir.codigo_diretorio === codigo) {
      return dir;
    }
    for (const subDir of dir.sub_diretorios) {
      const found = this.findDirectoryById(codigo, subDir);
      if (found) {
        return found;
      }
    }
    return undefined;
  }

  private findSubDirectoryById(codigo: string, dir: Diretorio): Diretorio[] | undefined {
    console.log(`Pesquisando sub-pasta de codigo: ${codigo}`)
    if (dir.codigo_diretorio_pai === codigo) {
      return dir.sub_diretorios;
    }
    for (const subDir of dir.sub_diretorios) {
      const found = this.findSubDirectoryById(codigo, subDir);
      if (found) {
        return found;
      }
    }
    return undefined;
  }
}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    //private _database: DynamicDatabase,
    private _database: DiretorioDatabase,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.codigo);
    let index = this.data.indexOf(node);
    //index = 1;
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      console.log('Saindo do toggle')
      return;
    }

    node.isLoading = true;
    console.log('Abrindo toggle')
    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          name => new DynamicFlatNode(node.item, node.codigo, node.level + 1, this._database.isExpandable(node.codigo)),
        );
        console.log(`Nodes mapeados: ${nodes}`)
        console.log(`Node parametro: ${node}`)
        console.log(`Children: ${children}`)
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}

@Component({
  selector: 'app-user-uploads',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatProgressBarModule, NgIf, NgFor, UserFolderUploadComponent, UserDocumentUploadComponent, RouterModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './user-uploads.component.html',
  styleUrl: './user-uploads.component.css'
})
export class UserUploadsComponent implements OnInit {
  @Input() idDiretorioRaiz!: string;
  diretorioRaiz: Diretorio = {
    caminho_diretorio: '',
    codigo_diretorio: '',
    codigo_diretorio_pai: '',
    codigo_proprietario: '',
    documentos: [],
    nome_diretorio: '',
    sub_diretorios: []
  }

  listDiretorios: Diretorio[] = []
  diretorioId: string = ''

  /*treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  dataSourceDiretorio: DynamicDataSource;
  getLevel = (node: DynamicFlatNode) => node.level;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;*/

  constructor(/*database: DynamicDatabase,
    databaseDiretorio: DiretorioDatabase,*/
    private diretorioService: DiretorioService,
    private route: ActivatedRoute){
    /*this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, databaseDiretorio);
    this.dataSourceDiretorio = new DynamicDataSource(this.treeControl, databaseDiretorio);*/

    //this.dataSource.data = database.initialData();

    //this.listarDiretorios();
    //this.dataSourceDiretorio.data = databaseDiretorio.initialData(this.listDiretorios);
  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.diretorioId = params['id'];

      if(this.diretorioId != undefined)
      {
        console.log(`buscando diretorio ${this.diretorioId}`)
        this.buscarDiretorio(this.diretorioId);
      }
      else
      {
        console.log('listando diretorio raiz')
        this.listarDiretorios();
      }

    });

    //console.log(this.listDiretorios)
  }

  listarDiretorios()
  {
    this.diretorioService.listarDiretorio().subscribe((response: Diretorio) => {
      //console.log('retorno do service de diretorio: ');
      //console.log(response);
      //this.listDiretorios = response;
      this.diretorioRaiz = response;
    });
  }

  buscarDiretorio(idDiretorio: string) {
    this.diretorioService.buscarDiretorio(idDiretorio).subscribe((response: Diretorio) => {
      this.diretorioRaiz = response;
    });
  }
}
