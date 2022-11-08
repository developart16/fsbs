import Head from 'next/head'
import { useEffect, useState } from 'react';
import ListingSelector from '../components/Listings/ListingSelector'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [listings, setListings] = useState([]);

  useEffect(()=>{
    (async() => {
      const res = await fetch('api/listings')
      const listings = (await res.json() || []);
      return listings && setListings(listings)
    })();
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Full Stack Bussines Case</title>
        <meta name="description" content="Ejemplo de reserva de espacios" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}> Bienvenido a Reservator </h1>
        <p className={styles.description}> Selecciona el <b>espacio</b> que quieres <b>reservar</b></p>

        <ListingSelector listings={listings} />
      </main>

      <footer className={styles.footer}>
        <span> With ♥ from {'artur.develop@gmail.com'} </span>
      </footer>
    </div>
  )
}
