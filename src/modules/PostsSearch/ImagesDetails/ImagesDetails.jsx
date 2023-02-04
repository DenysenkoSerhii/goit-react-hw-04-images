import styles from "./images-details.module.scss";

const ImagesDetails = ({largeImageURL}) => {
    return (
        <div>
            <img src={largeImageURL} alt=""/>
        </div>
    )
}

export default ImagesDetails;