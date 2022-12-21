import {useEffect} from "react";
import path from 'path'
import fs from 'fs/promises'

function ProductDetailPage(props) {
    const { loadedProduct } = props
    useEffect(() => {

    })

    if (!loadedProduct) {
        return <p>Loading...</p>
    }

    return <>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </>

}
async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    return data
}

export async function getStaticPaths() {
    const data = await getData()

    const ids = data.products.map(product => product.id)

    const pathWithParams = ids.map(id => ({ params: { pid: id }}))

    return {
        paths: pathWithParams,
        /**
         * fallback 사전 생성해야할 페이지가 많을 때 유용 (상품이 수백만 개일 경우)
         * 모든 페이지를 사전 생성하는게 최선이 아님 => 시간이 너무 오래 걸림
         * 방문객이 거의 없는 페이지에 대한 사전 생성은 시간과 자원낭비임.
         *
         * fallback을 true로 하면 방문이 적은 페이지의 생성을 미뤄서 필요한 경우에만 사전 생성되게 할 수 있다.
         *
         * * 문제. 링크를 클릭하지 않고 url 조작으로 요청하면 에러가 생긴다.
         * 이유는 사전 생성 기능이 즉시 끝나지 않기 때문.
         * 따라서 컴포넌트에서 폴백 상태를 반환할 수 있게 해줘야 한다.
         *
         * 해당 페이지에 아직 props로 전달되지 않았을 경우에는 loading을 리턴하는 식으로 해야 한다.
         *
         * fallback에 true | false 대신 'blocking'을 준 경우, 컴포넌트에서 fallback 확인을 할 필요 없음.
         * 대신에 서버에서 페이지가 사전 생성 되기 전까지 기다림
         * -> 사용자 대기 시간은 길어짐
         *
         * 페이지 생성과 데이터 페칭 시간이 오래 걸릴 경우 fallback 컨트롤이 알맞음
         * 만약 불완전한 페이지를 보여주고 싶지 않다면 blocking
         *
         * */
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context

    const productId = params.pid

    const data = await getData()

    const product = data.products.find(product => product.id === productId)

    if (!product) {
        return { notFound: true }
    }

    return {
        props: {
            loadedProduct: product
        }
    }
}

export default ProductDetailPage