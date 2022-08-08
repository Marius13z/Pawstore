export type CheckoutFormData = {
    deliveryAddress?: string
    country?: string
    city?: string
    phoneNumber?: number
    email: string
    message?: string
  };

export type ContactFormData = {
    message: string
    email: string
}

export type Product = {
    image: string
    description?: string
    price: number
    name: string
    id?: string
    category?: string
    quantity?: number
}

export type ProductData = {
    data: {
    image: string
    description?: string
    price: number
    name: string
    category?: string
    }
    id: string
}