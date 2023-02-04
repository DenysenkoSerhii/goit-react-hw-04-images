import { memo } from "react";
import PropTypes from "prop-types";
import useForm from "../../../shared/hooks/useForm"
import initialState from "./initialState";
import styles from "./images-search-form.module.scss";

const ImagesSearchForm = ({onSubmit}) => {
    const {state, handleChange, handleSubmit} = useForm({initialState, onSubmit});
const {search} = state;

    return (

        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <label className={styles.label} htmlFor="">Search images</label>
                <input value={search} onChange={handleChange} name="search" placeholder="Search images" required />
            </div>
        </form>
    )
}

export default memo(ImagesSearchForm);

ImagesSearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
// class PostsSearchForm extends Component {

//     state = {
//         search: "",
//     }

//     handleChange = ({ target }) => {
//         const { name, value } = target;
//         this.setState({ [name]: value });
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         const {onSubmit} = this.props;
//         onSubmit({...this.state});
//         this.reset()
//     }

//     reset(){
//         this.setState({
//             search: "",
//         })
//     }

//     render() {
//         const {search} = this.state;
//         const {handleChange, handleSubmit} = this;

//         return (
//             <form className={styles.form} onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="">Search posts</label>
//                     <input value={search} onChange={handleChange} name="search" placeholder="Search posts" required />
//                 </div>
//             </form>
//         )
//     }
// }

// export default PostsSearchForm;

// PostsSearchForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// }