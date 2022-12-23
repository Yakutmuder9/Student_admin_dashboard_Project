import {useRef, useState } from "react";
import clsx from "clsx";
import useLazyLoad from "./useLazyLoad";
import posts from './data.json';
import { FaSearch } from "react-icons/fa";
import { Books } from "../../../app/shared/Books";
import {Link} from "react-router-dom"
import "./resource.css";
import Loading from "./Loading"

const Card = ({ title, thumbnailUrl, isbn, shortDescription, authors }) => {

  const num = shortDescription;
  const shortDesc = typeof num === 'string' ? num.slice(0, 50) : '';

  return (
    <>
      <div class="booklist grid rounded">
        <div class="item blog ">
          <div class="title p-3">
            <h4 className="overflow-hidden">{title}</h4>
            <p>ISBN: {isbn}</p>
          </div>
          <div class="desc d-flex p-3">
            <img src={thumbnailUrl} alt='' />
            <div className="" id="bookContent">
              <p className="text-white">
                {shortDesc}{" "}..
              </p>
              <div className="d-flex justify-content-between align-items-end" >
                <p className="w-50 h-50">{authors}</p>
                <Link to={`/resources/${isbn}`}><button className="btn h-50 mb-3 me-1" id="startReadBtn">Start Read..</button></Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}


const LoadingPosts = () => {
  const loadPages = [1, 2, 3, 4, 5, 6 , 7, 8];
  return (
    <div className="grid grid-cols-3 gap-4 content-start mt-4">
      {loadPages.map(num => {
        return <div class="w-full rounded overflow-hidden shadow-lg ">
          <Loading />

        </div>
      })}
    </div>
  );
}

const Resources = () => {
  const [searchField, setSearchField] = useState("");
  const NUM_PER_PAGE = 8;
  const TOTAL_PAGES = Math.floor(Books.length / 8);

  const images = posts["data"];
  const triggerRef = useRef(null);

  const onGrabData = (currentPage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = images.slice(
          ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
          NUM_PER_PAGE * (currentPage % TOTAL_PAGES)
        );
        resolve(data);
      }, 500);
    });
  };

  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  return (
    <div className=" p-3 ">
      <h1 className="ps-3 mt-2 overflow-hidden">Resources</h1>
      <div className="container">
        <div class="input-group ">
          <div class="form-outline w-50 ">
            <input
              type="text"
              id="form1"
              class="form-control py-2"
              placeholder="Search Books here..."
              onChange={handleChange}
            />
            <label class="form-label text-warning" for="form1">
              Search
            </label>
          </div>

          <a type="button" class="bg-light h-100 px-4 py-2" >
            <FaSearch className="text-secondary" />
          </a>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-4 content-start">
        {
          data.filter(post => {
            if (searchField === '') {
              return post;
            } else if (post.title.toLowerCase().includes(searchField.toLowerCase())) {
              return post;
            }
          }).map(image => {

            return <>
              <Card title={image["title"]} thumbnailUrl={image["thumbnailUrl"]} authors={image["authors"]} shortDescription={image["shortDescription"]} isbn={image["isbn"]} />
            </>
          })}

      </div>
      {searchField === ''? <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
        <LoadingPosts />
      </div>: null}
      
    </div>
  )
}
export default Resources;















