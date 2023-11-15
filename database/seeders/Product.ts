import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class extends BaseSeeder {
  public async run() {
    const productsData = [
      {
        name: 'product1',
        weight: 15,
        price: 20,
        description: 'A high-quality product with advanced features.',
      },
      {
        name: 'product2',
        weight: 8,
        price: 30,
        description: 'Compact and affordable, suitable for everyday use.',
      },
      {
        name: 'product3',
        weight: 12,
        price: 25,
        description: 'Durable and stylish, perfect for any occasion.',
      },
      {
        name: 'product4',
        weight: 18,
        price: 15,
        description: 'Innovative design with cutting-edge technology.',
      },
      {
        name: 'product5',
        weight: 22,
        price: 40,
        description: 'Sleek and modern, enhances your lifestyle.',
      },
      {
        name: 'product6',
        weight: 14,
        price: 18,
        description: 'Versatile and user-friendly, meets your needs.',
      },
      {
        name: 'product7',
        weight: 20,
        price: 35,
        description: 'Efficient and reliable, a must-have for enthusiasts.',
      },
      {
        name: 'product8',
        weight: 25,
        price: 22,
        description: 'Eco-friendly and energy-efficient for sustainable living.',
      },
      {
        name: 'product9',
        weight: 17,
        price: 28,
        description: 'Precision-engineered for optimal performance.',
      },
      {
        name: 'product10',
        weight: 13,
        price: 12,
        description: 'Affordable yet high-quality, perfect for budget-conscious buyers.',
      },
      {
        name: 'product11',
        weight: 19,
        price: 32,
        description: 'Premium materials for a luxurious experience.',
      },
      {
        name: 'product12',
        weight: 16,
        price: 24,
        description: 'Compact size with powerful features.',
      },
      {
        name: 'product13',
        weight: 21,
        price: 38,
        description: 'Exceptional performance for demanding tasks.',
      },
      {
        name: 'product14',
        weight: 23,
        price: 14,
        description: 'Stylish and practical, a perfect addition to your collection.',
      },
      {
        name: 'product15',
        weight: 11,
        price: 26,
        description: 'Reliable and durable, built to last.',
      },
      {
        name: 'product16',
        weight: 28,
        price: 20,
        description: 'Innovative design for a futuristic experience.',
      },
      {
        name: 'product17',
        weight: 26,
        price: 30,
        description: 'Cutting-edge technology for the modern lifestyle.',
      },
      {
        name: 'product18',
        weight: 29,
        price: 16,
        description: 'Sleek and sophisticated, a statement piece for your space.',
      },
      {
        name: 'product19',
        weight: 27,
        price: 34,
        description: 'Versatile functionality for various applications.',
      },
      {
        name: 'product20',
        weight: 30,
        price: 42,
        description: 'Top-of-the-line quality for discerning customers.',
      },
    ]

    for (const productData of productsData) {
      const existingProduct = await Product.findBy('name', productData.name)

      if (existingProduct) {
        existingProduct.merge(productData)
        await existingProduct.save()
      } else {
        await Product.create(productData)
      }
    }
  }
}
