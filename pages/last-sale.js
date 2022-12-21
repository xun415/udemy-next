import {useEffect, useState} from "react";
import useSWR from 'swr'

function LastSalesPage() {
    const [sales, setSales] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const { data, error } = useSWR('https://nextjs-course-e05ea-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')

    useEffect(() => {
        if (data) {
            const transformedSales = []

            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volumn: data[key].volumn
                })
            }

            setSales(transformedSales)
        }
    }, [data])

    // useEffect(() => {
    //     setIsLoading(true)
    //
    //     fetch('https://nextjs-course-e05ea-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('data', data)
    //             const transformedSales = []
    //
    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volumn: data[key].volumn
    //                 })
    //             }
    //             console.log('transformedSales', transformedSales)
    //             setSales(transformedSales)
    //             setIsLoading(false)
    //         })
    //
    // }, [])
    if (error) {
        return <p>Fail to load</p>
    }

    if (!data || !sales) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {
                sales.map(sale =>
                    <li key={sale.id}>
                        {sale.username} - {sale.volumn}
                    </li>)
            }
        </ul>
    )
}

export async function getStaticProps() {
        fetch('https://nextjs-course-e05ea-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                const transformedSales = []

                for (const key in data) {
                    transformedSales.push({
                        id: key,
                        username: data[key].username,
                        volumn: data[key].volumn
                    })
                }
            })
}

export default LastSalesPage