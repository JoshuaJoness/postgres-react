export const getShirtData = (initialData: any[]) => {
    const totalSoldShirt1 = [];
    const totalSoldShirt2 = [];
    const totalSoldShirt3 = [];

    initialData.forEach((order: any) => {
        const { product_id } = order;
        if (product_id === 5) {
            totalSoldShirt1.push(product_id);
        } else if (product_id === 6) {
            totalSoldShirt2.push(product_id);
        } else if (product_id === 7) {
            totalSoldShirt3.push(product_id);
        }
    })

    const shirtNames = [... new Set(initialData.map(({ name }: { name: string }) => name))];

    const productSalesData = {
        labels: [...shirtNames],
        datasets: [
            {
            label: '# of Purchases',
            data: [totalSoldShirt1.length, totalSoldShirt2.length, totalSoldShirt3.length],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };

    return productSalesData;
}