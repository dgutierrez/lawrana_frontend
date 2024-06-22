import { Router } from "@angular/router";
import { EmpresaService } from "../services/empresa.service";
import { inject } from "@angular/core";

export const empAuthGuard  = () => {
  const empService = inject(EmpresaService)
  const router = inject(Router)

  if(empService.estaLogado()){
    return true
  } else {
    router.navigate(['/empresa/login']);
    return false
  }
}
