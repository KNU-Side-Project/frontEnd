import axios from "axios";
import '../../category-css/myScrap.css'
import { useEffect, useState } from "react";
import {AiOutlineLike, AiOutlineComment, AiOutlineStar, AiFillStar} from 'react-icons/ai';
import MyScrapPagenation from "./myScrapPagenation";
import { Route, Routes, Link, useParams } from "react-router-dom";

function MyScrap(props) {
    const token = props.cookies.token;
    let params = useParams();
    console.log(params)
    
    let [scrapList, setScrapList] = useState([]);
    let [totalPages, setTotalPages] = useState([]);
    useEffect(() => {
        axios.get('/api/v1/users/scraps', {
            headers : {Authorization: token},
            params : {
                page: 1
            }
        } )
        .then((res) => {
            console.log(res);
            console.log(res.data.total_pages)
            setScrapList(res.data.posts);
            let dataLength = [];
            for(var i=1; i<=10; i++){
                dataLength.push(i);
                if(i === res.data.total_pages){
                    break;
                }
            }
            setTotalPages(dataLength)
        })
        .catch(() => {
            console.log('err')
        })
    }, [])
    console.log(scrapList);
    console.log(totalPages)
    return(
        <>
        <div>my scrap</div>
        {scrapList.length !== 0 ? scrapList.map((a, i) => {
            return(
                <div key={i} className="my_scrap">
                    <p className="title">{a.post_title}</p>
                    <p className="content">{a.post_content}</p>
                    <div className="footer">
                        <div className="date_writer">
                            <p className="date">{a.post_date}</p>
                            <p className="writer">{a.writer_name}</p>
                        </div>
                        <div className="scrapPage_icons">
                            <AiOutlineLike className="like_icon" />
                            <p className="like_count">{a.likes_count}</p>
                            <AiOutlineComment className="comment_icon" />
                            <p className="comment_count">{a.comments_count}</p>
                            <AiOutlineStar className="scrap_icon" />
                            <p className="scrap_count">{a.scraps_count}</p>
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                </div>
            )
        }) : null}

        {/* pageNum */}
        <div className="myScrap_pageNum">
            {totalPages.map((a, i) => {
                return(
                    <Link to={`page/2`} key={i} style={a === 1 ? {color: '#0d6efd'} : null}>
                        <li>{a}</li>
                    </Link>
                )
            })}
        </div>

        <Routes>
            <Route path="page/2" element={<MyScrapPagenation token={token} />} />
        </Routes>
        </>
    )

    
}

export default MyScrap;