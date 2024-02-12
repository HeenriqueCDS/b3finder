provider "aws" {
  region = "sa-east-1"
  shared_credentials_files = ["~/.aws/credentials"]
}

resource "aws_instance" "b3finder-instance" {
  name = "b3finder-instance" 
  ami = "ami-0fb4cf3a99aa89f72"
  instance_type = "t2.micro"
}