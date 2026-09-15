#!/usr/bin/env python3
import os
import re

COMPONENTS = [
    "src/components/common/Typography/Typography",
    "src/components/common/Button/Button",
    "src/components/common/Badge/Badge",
    "src/components/common/Spinner/Spinner",
    "src/components/common/Rating/Rating",
    "src/components/layout/Header/Header",
    "src/components/layout/MainLayout/MainLayout",
    "src/components/product/ProductPrice/ProductPrice",
    "src/components/product/CategoryNav/CategoryNav",
    "src/components/product/ProductCard/ProductCard",
    "src/components/product/ProductGrid/ProductGrid",
]

for comp_path in COMPONENTS:
    types_file = f"{comp_path}.types.ts"
    tsx_file = f"{comp_path}.tsx"
    index_file = f"{os.path.dirname(comp_path)}/index.ts"

    if not os.path.exists(types_file):
        print(f"⏭️  Skipping {comp_path} - types file doesn't exist")
        continue

    # Read types file
    with open(types_file, 'r') as f:
        types_content = f.read()

    # Extract only export statements
    export_lines = []
    for line in types_content.split('\n'):
        if line.strip().startswith('export') and 'import React' not in line:
            export_lines.append(line)
        elif export_lines and (line.strip().startswith('}') or line.strip().startswith('|')):
            export_lines.append(line)

    types_to_add = '\n'.join(export_lines)

    # Read TSX file
    with open(tsx_file, 'r') as f:
        tsx_content = f.read()

    # Find import from types
    comp_name = os.path.basename(comp_path)
    import_pattern = rf"import .* from '\.\/{comp_name}\.types';"

    # Replace the import with the actual types
    new_tsx = re.sub(
        import_pattern,
        f'\n{types_to_add}\n',
        tsx_content
    )

    # Write back
    with open(tsx_file, 'w') as f:
        f.write(new_tsx)

    # Update index.ts
    if os.path.exists(index_file):
        with open(index_file, 'r') as f:
            index_content = f.read()

        new_index = re.sub(
            rf"export \* from '\.\/{comp_name}\.types';",
            f"export type * from './{comp_name}';",
            index_content
        )

        with open(index_file, 'w') as f:
            f.write(new_index)

    print(f"✅ Fixed {comp_path}")

print("\n🎉 All components consolidated!")
