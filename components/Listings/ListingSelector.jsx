import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Listing from "./Listing";

export default function ListingSelector({
  listings=[],
  pagination = 10,
  ...props
}) {

  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    setSelected(null)
  }, [currentPage]);

  const fncChangeSelected = ({ listingID }) => setSelected( selected !== listingID ? listingID : null)

  return <>
    <div className="listingSelector justifyCenter">
        {
          listings
          .slice((currentPage - 1) * pagination, currentPage * pagination)
          .map((listing, indx)=>{

            return (
              <Listing
                selected={selected === listing.listingID}
                key={listing.listingID}
                listing={listing}
                onClick={fncChangeSelected}
              />
            )
          })
        }
    </div>
    <div>

      <Button 
        disabled={currentPage === 1}
        onClick={()=>{setCurrentPage(currentPage - 1 )}}
      >Previous</Button>
      <Button
        disabled={listings.length <= pagination * currentPage }
        onClick={()=>{setCurrentPage(currentPage +1 )}}
      >Next</Button>

    </div>
  </>
};