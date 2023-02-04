import styles from "./images-search-list.module.scss";

const ImagesSearchList = ({items, showPost})=> {

        const elements = items.map(({ id, webformatURL, largeImageURL}) => <li onClick={()=> showPost({webformatURL, largeImageURL})} key={id} className={styles.item}>
                                                                <img src={webformatURL} alt="" className={styles.card}/>
                                                            </li>);
    // console.log(elements);
    return (
        <ul className={styles.list}>
            {elements}
        </ul>
    )
}

export default ImagesSearchList;

ImagesSearchList.defaultProps = {
    items: []
}