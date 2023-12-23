import { Icons } from "@/components/icons"

//-------------USER TYPES----------------------------------
export type UserImage = {
    key: string;
    name: string;
    url: string;
};

export type IUser = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: UserImage;
    role: string;
};

export type INewUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

//-------------PRODUCT TYPES----------------------------------

export type Review = {
    name: string;
    rating: number;
    title: string;
    comment: string;
    user: string;
    createdAt: string;
};

export type ProductImage = {
    // _id?: string;
    key: string;
    name: string;
    url: string;
};

export type ProductCategory =
    | "smartphones"
    | "cameras"
    | "computers"
    | "televisions"
    | "consoles"
    | "audio"
    | "mouse"
    | "keyboard";

export type Product = {
    _id?: string;
    name: string;
    slug: string;
    image: ProductImage[];
    brand: string;
    category: ProductCategory;
    description: string;
    rating?: number;
    numReviews?: number;
    price: number;
    countInStock: number;
    reviews?: Review[];
    createdAt?: string;
    updatedAt?: string;
};

export type INewProduct = {
    userId: string;
    name: string;
    image: ProductImage[];
    brand: string;
    category: ProductCategory;
    description: string;
    price: number;
    countInStock: number;
};

export type IUpdateProduct = {
    _id?: string;
    userId: string;
    name: string;
    image: ProductImage[];
    brand: string;
    category: ProductCategory;
    description: string;
    price: number;
    countInStock: number;
};

//-------------NAV TYPES----------------------------------
export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
}

export type SidebarNavItem = {
    title: string
    for: "all" | "admin"
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
} & (
        | {
            href: string
            items?: never
        }
        | {
            href?: string
            items: NavItem[]
        }
    )

export type DashboardConfig = {
    mainNav: NavItem[]
    sidebarNav: SidebarNavItem[]
}