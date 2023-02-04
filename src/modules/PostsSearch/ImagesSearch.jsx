import { useState, useEffect, useCallback } from "react";
import Modal from "../../shared/components/Modal/Modal";

import ImagesSearchForm from "./ImagesSearchForm/ImagesSearchForm";
import ImagesSearchList from "./ImagesSearchList/ImagesSearchList";
import ImagesDetails from "./ImagesDetails/ImagesDetails";

import { searchImages } from "../../shared/services/images-api";

import styles from "./images-search.module.scss";

const ImagesSearch = () => {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [imagesDetails, setImagesDetails] = useState(null);

    useEffect(() => {
        if (!search) {
            return;
        }

        const fetchImages = async () => {
            try {
                setLoading(true);
                const data = await searchImages(search, page);
                setItems(prevItems => ([...prevItems, ...data]));
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchImages();

    }, [search, page, setLoading, setItems, setError, setLoading, searchImages])

    const onSearchImages = useCallback(({ search }) => {
        setSearch(search);
        setItems([]);
        setPage(1);
    }, []);

    const showImages = useCallback((data) => {
        setImagesDetails(data);
        setShowModal(true);
    }, []);

    const loadMore = useCallback(() => {
        setPage(prevPage => prevPage + 1)
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setImagesDetails(null);
    }, []);

    return (
        <>
            <ImagesSearchForm onSubmit={onSearchImages} />
            <ImagesSearchList items={items} showPost={showImages} />
            {error && <p className={styles.errorMessage}>{error}</p>}
            {loading && <p>...Load images</p>}
            {Boolean(items.length) && <button onClick={loadMore}>Load more</button>}
            {showModal && <Modal close={closeModal}>
                <ImagesDetails {...imagesDetails} />
            </Modal>}
        </>
    )
}

export default ImagesSearch;

// class PostsSearch extends Component {
//     state = {
//         search: "",
//         items: [],
//         loading: false,
//         error: null,
//         page: 1,
//         showModal: false,
//         postDetails: null,
//     }

//     componentDidUpdate(prevProps, prevState) {
//         const {search, page} = this.state;
//         if(prevState.search !== search || prevState.page !== page) {
//             this.fetchPosts();
//         }
//     }

//     async fetchPosts() {
//         try {
//             this.setState({loading: true});
//             const {search, page} = this.state;
//             const data = await searchPosts(search, page);
//             console.log(data);
//             this.setState(({items}) => ({
//                 items: [...items, ...data]
//             }))
//         }
//         catch(error) {
//             this.setState({error: error.message})
//         }
//         finally {
//             this.setState({loading: false})
//         }
//     }

//     searchPosts = ({search})=> {
//         this.setState({search, items: [], page: 1});
//     }

//     loadMore = ()=> {
//         this.setState(({page}) => ({page: page + 1}))
//     }

//     showPost = ({webformatURL, largeImageURL}) => {
//         this.setState({
//             postDetails: {
//                 webformatURL,
//                 largeImageURL
//                 },
//             showModal: true,
//         })
//     }

//     closeModal = ()=> {
//         this.setState({
//             showModal: false,
//             postDetails: null,
//         })
//     }

//     render() {
//         const { items, loading, error, showModal, postDetails } = this.state;
//         const {searchPosts, loadMore, showPost, closeModal} = this;
        
//         return (
//             <>
//                 <PostsSearchForm onSubmit={searchPosts} />
//                 <PostsSearchList items={items} showPost={showPost} />
//                 {error && <p className={styles.errorMessage}>{error}</p>}
//                 {loading && <p>...Load posts</p>}
//                 {Boolean(items.length) && <button onClick={loadMore}>Load more</button>}
//                 {showModal && <Modal close={closeModal}>
//                     <PostDetails {...postDetails} />
//                 </Modal>}
//             </>
//         )
//     }
// }

// export default PostsSearch;