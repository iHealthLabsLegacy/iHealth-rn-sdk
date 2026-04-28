#!/bin/bash
# Cleanup script: removes unnecessary files from the SDK root.
# This package only has peerDependencies, so node_modules and
# package-lock.json are not needed here.

echo "Cleaning SDK root directory..."
echo ""

if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    echo "  Removed package-lock.json"
else
    echo "  package-lock.json not found, skipping"
fi

if [ -d "node_modules" ]; then
    if rm -rf node_modules 2>/dev/null; then
        echo "  Removed node_modules"
    else
        echo "  Warning: could not remove node_modules (permission denied)"
        echo "  Run manually: sudo rm -rf node_modules"
    fi
else
    echo "  node_modules not found, skipping"
fi

echo ""
echo "Done."
echo ""
echo "Note: this package only declares peerDependencies."
echo "Run 'npm install' inside the consumer project, not here."
