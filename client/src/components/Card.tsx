import { useNavigate } from 'react-router-dom';
import * as Int from '../interfaces'
import './Card.css'

export default function MediaCard(product:Int.Product) {
  const navigate=useNavigate()
  return (
    <div className='card' style={{backgroundImage:`url(${product.image_url[0]})`}}>
      <div className='card-content'>
        <h3 className='card-title'>{product.name.length>19?`${product.name.slice(0,16)+"..."}`:product.name.slice(0,19)}</h3>
        <div className='secondline'>
        <h2 className='card-price'>$ {product.price}</h2>
        <button className='card-button' onClick={()=>navigate(`product/${product._id}`)}>View Details</button>
        </div>
      </div>
    </div>
  );
}
