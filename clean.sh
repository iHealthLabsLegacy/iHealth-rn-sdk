#!/bin/bash
# 清理脚本：删除主库中不必要的文件
# 由于主库只有 peerDependencies，不需要 node_modules 和 package-lock.json

echo "🧹 正在清理主库目录..."
echo ""

# 删除 package-lock.json（如果存在）
if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    echo "✓ 已删除 package-lock.json"
else
    echo "  package-lock.json 不存在"
fi

# 删除 node_modules（如果存在）
if [ -d "node_modules" ]; then
    # 尝试删除，如果权限不足会提示
    if rm -rf node_modules 2>/dev/null; then
        echo "✓ 已删除 node_modules"
    else
        echo "⚠️  无法删除 node_modules（权限不足）"
        echo "   请手动运行: sudo rm -rf node_modules"
    fi
else
    echo "  node_modules 不存在"
fi

echo ""
echo "✨ 清理完成！"
echo ""
echo "📝 注意：此库只有 peerDependencies，不需要安装依赖。"
echo "   在使用此库的项目中运行 npm install 即可。"
echo ""
echo "🔒 已添加保护机制：在主库目录运行 npm install 会被阻止。"

