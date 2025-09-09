import ProductDetaiAll from "@/components/ProductDetail";
import { getProductDetail } from "@/lib/getProductDetail";

import { notFound } from "next/navigation";
export default async function Page({ params }: { params: { slug: string } }){
    const {slug} = await params
    const product = getProductDetail(slug)
    const productData = await product;
    
    if (!product) {
        return notFound(); 
  }
    return <ProductDetaiAll p={productData} />;
        
    
} 