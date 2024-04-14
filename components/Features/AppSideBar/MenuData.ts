import type { MenuItem } from "@/utils/types/MenuItemsTypes";

export const MENU_DATA: MenuItem[] = [
  {
    name: "Склады",
    url: "/Warehouse",
  },
  {
    name: "Каталог оборудования",
    url: "/Catalog",
  },
  {
    name: "Поставщики",
    url: "/Supplier",
  },
  {
    name: "Типы оборудования",
    url: "/EquipmentType",
  },
  {
    name: "Характеристики типов",
    url: "/EquipmentCharacteristic",
  },
  {
    name: "Потребность в оборудовании",
    url: "/EquipmentRequirements",
  },
  {
    name: "Остатки",
    url: "/Balance",
  },
  {
    name: "Документы",
    url: "/Documents",
  },
];
