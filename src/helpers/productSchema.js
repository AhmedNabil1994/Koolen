export function singleProductSchema(product) {
    // parameter=>  status

    // change thumbnail_image to be an array
    // add rating
    const schema = [];

    const {
        id,
        name,
        slug,
        base_discounted_price,
        base_price,
        thumbnail_image,
        photos,
        stock,
        rating,
        brand,
        tags,
        variation_options,
        description,
    } = product;

    let thumbnails;
    if (Array.isArray(thumbnail_image)) {
        thumbnails = [...new Set([...thumbnail_image, ...photos])];
    } else {
        thumbnails = [...new Set([thumbnail_image, ...photos])];
    }

    const payload = {
        id,
        name,
        slug,
        price: base_discounted_price,
        images: thumbnails,
        rating: rating || 0,
        stock,
        availability: stock ? 'in-stock' : 'out of stock',
        reviews: 0,
        brand,
        badges: [],
        categories: [],
        attributes: [],
        tags,
        colors: variation_options?.length ? variation_options[0].values : [],
        description: description || '',
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
            quantity,

        } = product;
        const payload = {
            id,
            name,
            slug,
            price: base_discounted_price,
            images: Array.isArray(thumbnail_image) ? [...thumbnail_image] : [thumbnail_image],
            rating,
            stock,
            availability: stock > 0 ? 'in-stock' : 'out-of-stock',
            reviews: 0,
            brand: null,
            badges: [],
            categories: [],
            attributes: [],
        };

        console.log('products quantity: ', quantity);

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
