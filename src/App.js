import newsIcon from './assets/icons/rns.svg'
import arrowIcon from './assets/icons/arrowicon.svg'
import { useEffect, useState } from 'react'
function App() {
  const headerArr = [
    {
      name: "Code",
      sortingType: ["A-Z", "Z-A"]
    },
    {
      name: "Name",
      sortingType: ["A-Z", "Z-A"]
    },
    {
      name: "Currency",
      sortingType: ["A-Z", "Z-A"]
    },
    {
      name: "Market cap",
      sortingType: ["High-Low", "Low-High"]
    },
    {
      name: "Price",
      sortingType: ["High-Low", "Low-High"]
    },
    {
      name: "Net  variation",
      id: 106,
      sortingType: ["High-Low", "Low-High"]
    },
    {
      name: "Change",
      sortingType: ["High-Low", "Low-High"]
    },
    {
      name: "Related News",
      id: 107,
    },
    {
      name: "Type",
      sortingType: ["A-Z", "Z-A"]
    },
    ""
  ]

  const bodyArr = [
    {
      code: "ZL04",
      name: "NAVOI MINING AND METALLURGICAL COMPANY",
      currency: "USD",
      marketCap: "35.65",
      price: "50",
      netVariation: "0.01",
      change: "1%",
      relatedNews: "",
      type: "Bonds",

    },
    {
      code: "AL06",
      name: "MANCHESTER CORPORATION",
      currency: "GBP",
      marketCap: "35.65",
      price: "50",
      netVariation: "0.01",
      change: "1%",
      relatedNews: newsIcon,
      type: "Equity",
    },
    {
      code: "01GT",
      name: "RESIDENTIAL MORTGAGE SECURITIES 4 PLC",
      currency: "EUR",
      marketCap: "35.65",
      price: "50",
      netVariation: "0.01",
      change: "1%",
      relatedNews: newsIcon,
      type: "ETFs",
    }
  ]

  const [selectedHeader, setSelectedHeader] = useState("");
  const [marketList, setMarketList] = useState(bodyArr);
  const [marketListPagination, setMarketListPagination] = useState(marketList);
  const perPage = 2

  const [currentPage, setCurrentPage] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    setTotalPage(Math.round(marketList.length / perPage))
  }, [pageNo])

  useEffect(() => {
    setMarketListPagination(marketList.slice(pageNo, pageNo + perPage))
  }, [marketList, pageNo])


  const filterSelectedHandler = (getVal) => {
    setSelectedHeader(getVal)
  }

  const applyFilterHandler = (getHeader, getFilterType) => {
    // console.log(getHeader, getFilterType)
    switch (getHeader) {
      case "Code": {
        if (getFilterType === "A-Z") {
          setMarketListPagination(bodyArr.sort((a, b) => a.code.localeCompare(b.code)))
          setMarketList(bodyArr.sort((a, b) => a.code.localeCompare(b.code)))
        }
        else {
          setMarketListPagination(bodyArr.sort((a, b) => b.code.localeCompare(a.code)))
          setMarketList(bodyArr.sort((a, b) => b.code.localeCompare(a.code)))
        }
        setSelectedHeader("")
        break;
      }

      case "Name": {
        if (getFilterType === "A-Z") {
          setMarketListPagination(bodyArr.sort())
        }
        else {
          setMarketListPagination(bodyArr.sort().reverse())
        }
        setSelectedHeader("")
        break;
      }

      case "Currency": {
        break;
      }

      default: return null
    }
  }

  const nextHandler = () => {
  }

  const currentPageHandler = (getPageNo) => {
    setPageNo(getPageNo)
  }


  return (
    <div className="mx-20 mt-10 ">
      <table className="w-full ">
        <thead>
          <tr className=' bg-[#fafafa] p-0 h-12'>
            {
              headerArr.map((val, ind) => {
                return <td key={ind} className='relative' >
                  <h5 onClick={() => filterSelectedHandler(val.name)} className={`w-22 font-semibold  mx-4 flex items-center cursor-pointer ${selectedHeader === val.name && val?.sortingType !== undefined ? "text-[#001eff] border-t-4 border-[#001eff] " : "text-black"} `}>
                    {val.name}
                    {
                      val?.sortingType !== undefined &&
                      <img src={arrowIcon} alt='arrowIcon' className='w-4 mt-1' />
                    }
                  </h5>
                  {
                    selectedHeader === val.name && val?.sortingType !== undefined
                    &&
                    <div className='absolute top-10 left-4 border min-w-24 p-2 bg-white'>
                      {
                        val?.sortingType.map((sortVal, index) => <p
                          key={index}
                          className='cursor-pointer py-1 hover:underline'
                          onClick={() => applyFilterHandler(val.name, sortVal)}
                        >
                          {sortVal}
                        </p>)
                      }
                    </div>
                  }
                </td>
              })
            }
          </tr>
        </thead>

        <tbody>
          {
            marketListPagination?.map((val) => {
              return <tr key={val.code} className="h-14 border-b">
                <td >
                  <p className="truncate w-20  mx-4 text-[#001eff] font-semibold cursor-pointer hover:underline">
                    {val.code}
                  </p>
                </td>
                <td>
                  <p className="truncate w-20 mx-4">
                    {val.name}
                  </p>
                </td>
                <td>
                  <p className="truncate w-20  mx-4">
                    {val.currency}
                  </p>
                </td>
                <td>
                  <p className="truncate w-20  mx-4">
                    {val.marketCap}
                  </p>
                </td>
                <td>
                  <p className="truncate w-20  mx-4">
                    {val.price}
                  </p>
                </td>
                <td>
                  <p className="truncate w-20  mx-4">
                    {val.netVariation}
                  </p>
                </td>
                <td>
                  <p className="truncate w-20  mx-4">
                    {val.change}
                  </p>
                </td>
                <td>
                  {
                    val.relatedNews !== ""
                      ?
                      <img src={val.relatedNews} alt={val.name} className=" h-10  mx-4 cursor-pointer" />
                      :
                      <span className='mx-4'>
                        -
                      </span>
                  }
                </td>
                <td>
                  <p className={`truncate w-max  mx-4 py-1 px-3 text-white cursor-pointer ${val.type === "Bonds" ? "bg-[#472574]" : val.type === "Equity" ? "bg-[#22775e]" : "bg-[#7e1b1b]"}`}>
                    {val.type}
                  </p>
                </td>
                <td>
                  <div className=" w-max mx-4">
                    <div className="py-1 px-3 border-dashed border border-[#001eff] text-[#001eff] rounded-xl cursor-pointer">
                      Track
                    </div>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>

      <div className='flex items-center justify-center gap-2 fixed left-0 bottom-20 w-full'>
        <div>Previous</div>
        {
          [...Array(totalPage)].map((_, i) => <div className='border p-1' onClick={() => currentPageHandler(i * 2)} >{i + 1}</div>)
        }
        <div>Next</div>
      </div>
    </div>
  );
}

export default App;
