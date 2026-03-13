#!/bin/bash

# 测试脚本 - 验证所有页面功能

echo "=== 开始测试页面功能 ==="
echo ""

# 测试首页
echo "1. 测试首页 (index.html)"
curl -s -o /dev/null -w "状态码: %{http_code}\n" http://localhost:8000/index.html
echo ""

# 测试案例汇总页
echo "2. 测试案例汇总页 (cases.html)"
curl -s -o /dev/null -w "状态码: %{http_code}\n" http://localhost:8000/cases.html
echo ""

# 测试虚拟演示页
echo "3. 测试虚拟演示页 (demo.html)"
curl -s -o /dev/null -w "状态码: %{http_code}\n" http://localhost:8000/demo.html
echo ""

# 测试案例子页面
echo "4. 测试案例子页面"
for i in {1..8}
do
  echo "   case-$i.html:"
  curl -s -o /dev/null -w "     状态码: %{http_code}\n" http://localhost:8000/case-$i.html
done
echo ""

# 测试about页面（应该被重定向）
echo "5. 测试about页面 (应该被重定向)"
curl -s -L -o /dev/null -w "最终状态码: %{http_code}, 重定向次数: %{num_redirects}\n" http://localhost:8000/about.html
echo ""

echo "=== 测试完成 ==="