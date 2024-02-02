export interface Result {
    id: string;
    name: string;
    description: string;
    brewery_type: string;
    address_1: string;
    address_2?: string;
    address_3?: string;
    city: string;
    state_province: string;
    postal_code: string;
    country: string;
    longitude: number;
    latitude: number;
    phone: string;
    website_url: string;
    state: string;
    street: string;
}
