export const getProduct = async (productId: number) => {
    try {
        const response = await fetch(`http://localhost:3001/product/${productId}`); // TODO update once Node deployed
        const product = await response.json();
        return product;
    } catch (err) {
        console.log(err, 'LOOK')
    }
}

export const addProductToOrder = async (orders: any) => {
    const mappedOrdersPromises = await orders.map(async (order: any) => {
    const { product_id: productId } = order;
    const product = await getProduct(productId);
    const { name, cost, image_url: imgUrl } = await product[0];

        return {
            name,
            cost,
            imgUrl,
            ...order,
        }
    })

    const ords = await Promise.all(mappedOrdersPromises)

    return ords;
}