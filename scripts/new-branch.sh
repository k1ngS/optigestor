#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Uso: ./scripts/new-branch.sh <tipo> <descricao>"
  echo "Tipos: feat | fix | refactor | docs | release"
  exit 1
fi

type="$1"
shift

description="$(printf '%s' "$*" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g' | sed 's/^-//' | sed 's/-$//')"

case "$type" in
  feat|fix|refactor|docs|release) ;;
  *)
    echo "Tipo inválido: $type"
    exit 1
    ;;
esac

branch_name="$type/$description"
git checkout -b "$branch_name"
echo "Branch criada: $branch_name"
