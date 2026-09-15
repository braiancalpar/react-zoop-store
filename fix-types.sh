#!/bin/bash

# Script para consolidar arquivos .types.ts nos componentes

# Lista de componentes para corrigir
COMPONENTS=(
  "src/components/common/Typography/Typography"
  "src/components/common/Button/Button"
  "src/components/common/Input/Input"
  "src/components/common/Badge/Badge"
  "src/components/common/Spinner/Spinner"
  "src/components/common/Rating/Rating"
  "src/components/layout/Header/Header"
  "src/components/layout/MainLayout/MainLayout"
  "src/components/product/ProductPrice/ProductPrice"
  "src/components/product/CategoryNav/CategoryNav"
  "src/components/product/ProductCard/ProductCard"
  "src/components/product/ProductGrid/ProductGrid"
)

for comp in "${COMPONENTS[@]}"; do
  TYPES_FILE="${comp}.types.ts"
  TSX_FILE="${comp}.tsx"
  INDEX_FILE="$(dirname $comp)/index.ts"

  if [ -f "$TYPES_FILE" ]; then
    echo "Processing $comp..."

    # Extract types content (skip comment headers and import React)
    TYPES_CONTENT=$(sed -n '/^export/,$ p' "$TYPES_FILE")

    # Add types to TSX file after imports
    # First, find line with last import
    LAST_IMPORT_LINE=$(grep -n "^import" "$TSX_FILE" | tail -1 | cut -d: -f1)

    # Insert types after last import
    {
      head -n "$LAST_IMPORT_LINE" "$TSX_FILE"
      echo ""
      echo "$TYPES_CONTENT"
      tail -n +$((LAST_IMPORT_LINE + 1)) "$TSX_FILE" | grep -v "import.*from.*types"
    } > "${TSX_FILE}.tmp"

    mv "${TSX_FILE}.tmp" "$TSX_FILE"

    # Update index.ts to export types from component file
    COMPONENT_NAME=$(basename "$comp")
    if [ -f "$INDEX_FILE" ]; then
      sed -i '' "s|export \* from './${COMPONENT_NAME}.types';|export type * from './${COMPONENT_NAME}';|" "$INDEX_FILE"
    fi

    echo "✅ Fixed $comp"
  fi
done

echo "🎉 All components fixed!"
