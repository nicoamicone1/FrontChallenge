import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as Int from '../interfaces'
import './Card.css'

export default function MediaCard(product:Int.Product) {
  return (
    <div className='card' style={{backgroundImage:`url(${product.image_url})`}}>
      <div className='card-content'>
        <h2 className='card-title'>{product.name}</h2>
        <div className='secondline'>
        <h2 className='card-price'>$ {product.price}</h2>
        <button className='card-button'>View Details</button>
        </div>
      </div>
    </div>
  );
}
