import {useEffect} from "react";
import path from 'path'
import fs from 'fs/promises'

function ProductDetailPage(props) {
    const { loadedProduct } = props
    useEffect(() => {

    })
    return <>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </>

}
export async function getStaticPaths() {
    return {
        paths: [
            { params: { pid: 'p1' } },
        ],
        /**
         * fallback 사전 생성해야할 페이지가 많을 때 유용 (상품이 수백만 개일 경우)
         * 모든 페이지를 사전 생성하는게 최선이 아님 => 시간이 너무 오래 걸림
         * 방문객이 거의 없는 페이지에 대한 사전 생성은 시간과 자원낭비임.
         *
         * */
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context

    const productId = params.pid

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    const product = data.products.find(product => product.id === productId)

    return {
        props: {
            loadedProduct: product
        }
    }
}

export default ProductDetailPage