'use client';

import styles from '../../page.module.css'
import { useEffect, useState } from 'react';



export default function Home(props) {
    const { params: { slug } }: {params: { slug: string } } = props;

    const [pageNum, setPageNum] = useState({});

    useEffect(() => {
        fetch('/api/Weather').then((res) => res.json()).then((data) => {
            setPageNum(data)
        })
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div>
                    {pageNum.base}
                </div>
            </div>
        </main>
    )
}
