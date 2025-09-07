    -- WARNING: This schema is for context only and is not meant to be run.
    -- Table order and constraints may not be valid for execution.

    CREATE TABLE public.addresses (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    label text,
    address_line1 text,
    address_line2 text,
    city text,
    state text,
    pincode text,
    coordinates USER-DEFINED,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT addresses_pkey PRIMARY KEY (id),
    CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.cart_items (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    cart_id uuid,
    menu_item_id uuid,
    quantity integer DEFAULT 1,
    CONSTRAINT cart_items_pkey PRIMARY KEY (id),
    CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id),
    CONSTRAINT cart_items_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id)
    );
    CREATE TABLE public.carts (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT carts_pkey PRIMARY KEY (id),
    CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.categories (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    restaurant_id uuid,
    name text NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id)
    );
    CREATE TABLE public.cook_bookings (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    customer_id uuid,
    cook_id uuid,
    booking_time timestamp with time zone NOT NULL,
    status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'accepted'::text, 'declined'::text, 'completed'::text])),
    description text,
    CONSTRAINT cook_bookings_pkey PRIMARY KEY (id),
    CONSTRAINT cook_bookings_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.users(id),
    CONSTRAINT cook_bookings_cook_id_fkey FOREIGN KEY (cook_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.cook_dishes (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    cook_id uuid,
    name text,
    price numeric,
    description text,
    CONSTRAINT cook_dishes_pkey PRIMARY KEY (id),
    CONSTRAINT cook_dishes_cook_id_fkey FOREIGN KEY (cook_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.delivery_tracking (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    order_id uuid,
    current_latitude double precision,
    current_longitude double precision,
    last_updated timestamp with time zone DEFAULT now(),
    CONSTRAINT delivery_tracking_pkey PRIMARY KEY (id),
    CONSTRAINT delivery_tracking_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id)
    );
    CREATE TABLE public.delivery_vehicles (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    vehicle_type text CHECK (vehicle_type = ANY (ARRAY['bike'::text, 'car'::text, 'bicycle'::text])),
    license_number text,
    verified boolean DEFAULT false,
    CONSTRAINT delivery_vehicles_pkey PRIMARY KEY (id),
    CONSTRAINT delivery_vehicles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.dine_in_sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    table_id uuid,
    user_id uuid,
    started_at timestamp with time zone DEFAULT now(),
    ended_at timestamp with time zone,
    is_active boolean DEFAULT true,
    CONSTRAINT dine_in_sessions_pkey PRIMARY KEY (id),
    CONSTRAINT dine_in_sessions_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.restaurant_tables(id),
    CONSTRAINT dine_in_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.magic_mom_profiles (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    bio text,
    availability boolean DEFAULT true,
    cuisine_speciality ARRAY,
    CONSTRAINT magic_mom_profiles_pkey PRIMARY KEY (id),
    CONSTRAINT magic_mom_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.menu_item_sizes (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    menu_item_id uuid NOT NULL,
    size_name text NOT NULL,
    price numeric NOT NULL CHECK (price >= 0::numeric),
    CONSTRAINT menu_item_sizes_pkey PRIMARY KEY (id),
    CONSTRAINT menu_item_sizes_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id)
    );
    CREATE TABLE public.menu_items (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    restaurant_id uuid,
    category_id uuid,
    name text NOT NULL,
    description text,
    price numeric,
    available boolean DEFAULT true,
    CONSTRAINT menu_items_pkey PRIMARY KEY (id),
    CONSTRAINT menu_items_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id),
    CONSTRAINT menu_items_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
    );
    CREATE TABLE public.messages (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    ticket_id uuid,
    sender_id uuid,
    message text,
    sent_at timestamp with time zone DEFAULT now(),
    CONSTRAINT messages_pkey PRIMARY KEY (id),
    CONSTRAINT messages_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.support_tickets(id),
    CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.order_items (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    order_id uuid,
    menu_item_id uuid,
    quantity integer,
    price numeric,
    CONSTRAINT order_items_pkey PRIMARY KEY (id),
    CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
    CONSTRAINT order_items_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id)
    );
    CREATE TABLE public.orders (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    restaurant_id uuid,
    delivery_address_id uuid,
    delivery_person_id uuid,
    status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'accepted'::text, 'preparing'::text, 'out_for_delivery'::text, 'delivered'::text, 'cancelled'::text])),
    total_amount numeric,
    placed_at timestamp with time zone DEFAULT now(),
    order_type text DEFAULT 'delivery'::text CHECK (order_type = ANY (ARRAY['delivery'::text, 'pickup'::text, 'dine_in'::text])),
    dine_in_session_id uuid,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT orders_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id),
    CONSTRAINT orders_delivery_address_id_fkey FOREIGN KEY (delivery_address_id) REFERENCES public.addresses(id),
    CONSTRAINT orders_delivery_person_id_fkey FOREIGN KEY (delivery_person_id) REFERENCES public.users(id),
    CONSTRAINT orders_dine_in_session_id_fkey FOREIGN KEY (dine_in_session_id) REFERENCES public.dine_in_sessions(id)
    );
    CREATE TABLE public.payments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    order_id uuid,
    payment_gateway text,
    payment_status text CHECK (payment_status = ANY (ARRAY['pending'::text, 'paid'::text, 'failed'::text, 'refunded'::text])),
    transaction_id text,
    amount numeric,
    paid_at timestamp with time zone,
    CONSTRAINT payments_pkey PRIMARY KEY (id),
    CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id)
    );
    CREATE TABLE public.ratings (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    target_id uuid,
    target_type text CHECK (target_type = ANY (ARRAY['restaurant'::text, 'cook'::text, 'delivery'::text])),
    rating integer CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT ratings_pkey PRIMARY KEY (id),
    CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.restaurant_staff (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    restaurant_id uuid,
    role text NOT NULL CHECK (role = ANY (ARRAY['manager'::text, 'chef'::text, 'waiter'::text, 'support'::text])),
    joined_at timestamp with time zone DEFAULT now(),
    CONSTRAINT restaurant_staff_pkey PRIMARY KEY (id),
    CONSTRAINT restaurant_staff_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id),
    CONSTRAINT restaurant_staff_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.restaurant_tables (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    restaurant_id uuid,
    table_number text NOT NULL,
    qr_code text,
    capacity integer DEFAULT 2,
    is_active boolean DEFAULT true,
    CONSTRAINT restaurant_tables_pkey PRIMARY KEY (id),
    CONSTRAINT restaurant_tables_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id)
    );
    CREATE TABLE public.restaurants (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    owner_id uuid,
    name text NOT NULL,
    description text,
    address_id uuid,
    open_time time without time zone,
    close_time time without time zone,
    is_open boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    supports_dine_in boolean DEFAULT false,
    CONSTRAINT restaurants_pkey PRIMARY KEY (id),
    CONSTRAINT restaurants_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id),
    CONSTRAINT restaurants_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id)
    );
    CREATE TABLE public.spatial_ref_sys (
    srid integer NOT NULL CHECK (srid > 0 AND srid <= 998999),
    auth_name character varying,
    auth_srid integer,
    srtext character varying,
    proj4text character varying,
    CONSTRAINT spatial_ref_sys_pkey PRIMARY KEY (srid)
    );
    CREATE TABLE public.support_tickets (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    subject text,
    status text DEFAULT 'open'::text CHECK (status = ANY (ARRAY['open'::text, 'closed'::text, 'pending'::text])),
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT support_tickets_pkey PRIMARY KEY (id),
    CONSTRAINT support_tickets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
    CREATE TABLE public.users (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    full_name text NOT NULL,
    email text NOT NULL UNIQUE,
    phone text UNIQUE,
    role text NOT NULL CHECK (role = ANY (ARRAY['customer'::text, 'delivery'::text, 'cook'::text, 'restaurant_owner'::text, 'admin'::text])),
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
    );