provider "aws" {
  region = "us-east-1"  # Altere para a região desejada
}

resource "aws_s3_bucket" "angular_app_bucket" {
  bucket = "meu-angular-app-bucket"  # Nome do bucket
  force_destroy = true  # Permite deletar o bucket mesmo com arquivos

  tags = {
    Name        = "AngularAppBucket"
    Environment = "Production"
  }
}

resource "aws_s3_bucket_website_configuration" "angular_app_website" {
  bucket = aws_s3_bucket.angular_app_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"  # Para SPAs, redireciona para o index.html em caso de erro
  }
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = aws_s3_bucket.angular_app_bucket.id

  block_public_acls   = true
  block_public_policy = false
  ignore_public_acls  = true
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "angular_app_bucket_policy" {
  bucket = aws_s3_bucket.angular_app_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.angular_app_bucket.arn}/*"
      }
    ]
  })
}

resource "aws_s3_object" "angular_app_files" {
  for_each = fileset("${path.module}./front/lawrana/dist", "**/*")

  bucket = aws_s3_bucket.angular_app_bucket.bucket
  key    = each.key
  source = "${path.module}./front/lawrana/dist/${each.key}"
  etag   = filemd5("${path.module}./front/lawrana/dist/${each.key}")
  #acl    = "public-read"
}

output "website_url" {
  value = aws_s3_bucket.angular_app_website.website_endpoint
}
