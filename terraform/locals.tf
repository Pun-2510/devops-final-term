locals {
  azs = [
    "${var.region}a",
    "${var.region}b"
  ]

  vpc_cidr = "10.123.0.0/16"

  public_subnets = [
    "10.123.1.0/24",
    "10.123.2.0/24"
  ]

  private_subnets = [
    "10.123.3.0/24",
    "10.123.4.0/24"
  ]

  intra_subnets = [
    "10.123.5.0/24",
    "10.123.6.0/24"
  ]

  tags = {
    Project = var.cluster_name
    Env     = "dev"
  }
}