import type { MenuItem } from "@/utils/types/MenuItemsTypes";

export const MENU_DATA: MenuItem[] = [
  {
    name: "Склады",
    url: "/Warehouse",
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
    name: "Каталог оборудования",
    url: "/Catalog",
  },
  {
    name: "Справочник оборудования",
    url: "/Handbook",
  },
  {
    name: "Потребность в оборудовании",
    url: "/EquipmentRequirements",
  },
  {
    name: "Заказ на поставку",
    url: "/DeliveryOrder",
  },
  {
    name: "Заказ на перемещение",
    url: "/RelocationOrder",
  },
  {
    name: "Заказ на приемку",
    url: "/AcceptOrder",
  },
  {
    name: "Заказ на отгрузку",
    url: "/ShippingOrder",
  },
  {
    name: "Остатки",
    url: "/Balance",
  },
  {
    name: "Регистр движения",
    url: "/Movements",
  },
  {
    name: "Отчеты",
    url: "/Movements",
  },
];
