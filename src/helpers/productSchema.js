// for the product details
export function singleProductSchema(product) {
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
        review_summary: { average, total_count },
        brand,
        tags,
        variation_options,
        description,
        variations,
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
        rating: average || 0,
        stock,
        availability: stock ? 'in-stock' : 'out-of-stock',
        reviews: total_count,
        brand,
        badges: [],
        categories: [],
        attributes: [],
        tags,
        colors: variation_options?.length ? variation_options[0].values : [],
        description: description || '',
        variations,
    };

    if (base_price - base_discounted_price > 0) {
        payload.compareAtPrice = base_price;
    }
    schema.push(payload);

    return schema;
}

// for all products
export default function productSchema(products) {
    const schema = [];

    products.forEach((product) => {
        const {
            id, name, slug, base_discounted_price, base_price, thumbnail_image, stock, rating,
            review_summary: { total_count },

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
            reviews: total_count,
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
