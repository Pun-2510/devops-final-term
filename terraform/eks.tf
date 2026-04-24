module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "19.15.1"

  cluster_name                   = var.cluster_name
  cluster_version                = "1.33"
  cluster_endpoint_public_access = true

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.private_subnets
  control_plane_subnet_ids = module.vpc.intra_subnets

  enable_irsa = true

  cluster_addons = {
    coredns    = { most_recent = true }
    kube-proxy = { most_recent = true } 
    vpc-cni    = { most_recent = true }

    aws-ebs-csi-driver = {
      most_recent = true
      service_account_role_arn = module.ebs_csi_irsa_role.iam_role_arn
    }
  }

  eks_managed_node_group_defaults = { 
    instance_types = ["t3.medium"]
    ami_type       = "AL2023_x86_64_STANDARD"

    vpc_security_group_ids = [aws_security_group.eks_node_extra.id]
  }

  eks_managed_node_groups = {
    main = {
      desired_size = 2
      min_size     = 1
      max_size     = 4

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"

      force_update_version = true
      
      recreate_missing_pod_disruption_budgets = true

      tags = {
        Name = "${var.cluster_name}-main-node-group"
      }
    }
  }

  tags = {
    Project = var.cluster_name
    Env     = "dev"
  }
}