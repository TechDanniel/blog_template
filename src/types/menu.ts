export interface menuItem {
  index: string;
  icon: any; // 这里可以根据实际情况替换为具体的图标类型
  label: string;
  children?: menuItem[]; // 可选的子菜单项
}