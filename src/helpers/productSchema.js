export function singleProductSchema(product) {
    // parameter=>  status

    // change thumbnail_image to be an array
    // add rating
    const schema = [];

    const {
        id, name, slug, base_discounted_price, base_price, thumbnail_image, photos, stock, rating, brand, tags, variation_options, description,
    } = product;

    const payload = {
        id,
        name,
        slug,
        price: base_discounted_price,
        images: [thumbnail_image, ...photos.filter((item) => item !== thumbnail_image)],
        rating,
        stock,
        availability: stock ? 'in-stock' : 'out of stock',
        reviews: 0,
        brand,
        badges: [],
        categories: [],
        attributes: [],
        tags,
        colors: variation_options[0].values,
        description,
    };

    if (base_price - base_discounted_price > 0) {
        payload.compareAtPrice = base_price;
    }
    // if (status) {
    //     payload.badges = [status];
    // }

    schema.push(payload);

    return schema;
}

export default function productSchema(products) {
    // parameter => status

    // change thumbnail_image to be an array
    // add rating
    const schema = [];

    products.forEach((product) => {
        const {
            id, name, slug, base_discounted_price, base_price, thumbnail_image, stock, rating,

        } = product;
        const payload = {
            id,
            name,
            slug,
            price: base_discounted_price,
            images: [thumbnail_image],
            rating,
            stock,
            availability: stock > 0 ? 'in-stock' : 'out-of-stock',
            reviews: 0,
            brand: null,
            badges: [],
            categories: [],
            attributes: [],
        };

        if (base_price - base_discounted_price > 0) {
            payload.compareAtPrice = base_price;
        }

        // if (status) {
        // payload.badges = [status];
        // }

        schema.push(payload);
    });

    return schema;
}
