import React from 'react'
import PreviewBox from '../components/PreviewBox'
import "../styles/ReservationResultView.scss"

export default function ReservationResultView() {
  return (
    <div className="reservation-result-view">

      <div className="reservation-result-message">
        <img alt="basarılı" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFjUlEQVR4nO2aW2wUVRjHfzOzl+52213o0juF1gK9ULmUixIVFCsETSTxQZO+aBR40YR3n9UHjJKQ8IDR+CgokRgSGggRE2MChRbQUiK0zbYWatvtjb10dnd2fGghXcrudrdndsHu7232zPed//7nnDNnzjmQI8eSRpp78e77h49KsDFbYjKBDtdPfn/08MNr09xCCTbq6DszLytzSLHPHDlLOp4acgZkW0C2MSUqDAT9hFQVCbDbHZgtFgBC4RBBvw8dsFrzsNnsqdes6zzwP0CLRNKQvXCS6UtogN//AD2qA6BLEq5ZA4IBH2pIBSAcDqdlQESLEAz4U45LlWT6EhrgyC9EVadnW0D+o9/tNgfozLQAizUtYSbFhN2WT0QzuAUk0ZfQAJvN/kT3zBYLTsvyxSmTJBwFhYvLIYAlPwjmDMi2gGwTMwY0NNQOyrJyI1tiMkE0qg3OvY6ZGI9OTFwC6X/9LQD6b26Xa9fDqyXfBXIGZFtAtkk4ETIKXY8SCE8SUCcBsFud2M1OJCnzzyNjBmjREH8PX6Z3uJP+8S60aCimXJEtVC1rpKZ4E2uLt6PIlozoMtwAXdfpHvqdK30/41PH496nRUP0eTvp83ZyufcM22v2U1f60rwVHNEYakBYU7lw6wS9ox0pxfnUMS52f8fdkWvsaTiERbEZpNDAQVCN+Pmp47OU//xcPKM3ON3xBWokIFBZLIYYoOtRzt86gdc3sOhcXt8AbV3HieqaAGXzMcSAq56zeLw3heUbGOuiw3NOWL65CDcgGJqio1+82Gv9ZwmGJoXnFW5Ax0AbYW06rVhFNvHmhoPs23AAWVJiysKaSufAeRESYxBuQM/I1bRjX61/jy3Ve9havZcS56p55XcXkTseQg3w+v9hKjiSVmz1iiZ21O4H4P5ED/9OeubdMxUcZsx/b1EaH0eoAeOBobTi8swO3t78MZIkEdZUTl89GnfUHw88xQb4p+PP9BLx1sZDOG1uAM7d/BavL/6f9KtiB0KhBkSi4ZRjNq9uobFiBwC371+m03MxSR1qWtriIdQAuzXxMnfFsjVsrd6LSTEDUOQoZ2/TBwBMBb380nl8AXU4Fy90DkK/BRyWZQnLW1/8FJulgLqybZxq/5J3thzGrFjRdZ0zHccIhnwLqGOR+xGPIbQFlDprUWaf7pPo93YDUFO8gU9eP0aZ6zkA/rh7hr6RP5PmVxQzJYXVYsTOItQAs2Kl0lUft/zH9q+4M3QNgHyrC4D7E7382v3DgvKvdDViVvIWL3QOwidC6yt2xS3TomFOXjnyyISZV97XaNGF7Q+uLxe/YC18PaC6aBMVrjoGJ24/sVyLhjnVfoRNVbsZHL+T8JU3l3LnOla7xR9fMuRr8OW1rZgSLGlFtDDtfW3cm+hZUD6zYmXnulZR8mIwxAB3fiVvNB4EIctZEq/VfUhR/koBueZj2IpQjbuZlvqPkOX4b4VkKIqZlvoDrCneKlBZLIauCa4r3YHTVsyF7m+YDA6nFOuyl9JSf4CSwhqD1M1g+KpwqbOW1m2f03XvEp0DbUxNjya8vzDPzeaqfTSUvYIsKwnvFUFG9gVkWaGpcjdNlbsZ9fXj8f7F1PQIfnUCmJkTFOatYFVRE26HMX09HhnfGXI7qnA7qjJdbVyW/N7gkjfAkC4wMhZAnRZ7/C0vz4R7eRoHMpMg3AB/MMTtO+mtCyaj+fky7Daxm6bCu4DVYsJuT3/yEw+7zYLFIr7BCs9oUmSam8pFpzWM3CBodAXRqM7QiI+opqcUJysSpSscyPIzfD4AYGjYR49nLO348pICgWrmY3gXKHBYMJtSr8ZskinIN/6YjOEtoMBh5YXmzM7vU2HJD4JL3oDYLiBJ19FTG62fOSTperYl5MjxFPEfQJGf294rUwsAAAAASUVORK5CYII=" />
        <h2>
          Rezervasyon Kaydınız Alınmıştır
        </h2>
        <p>
          Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri kullabilirsiniz.
        </p>

        <div className="reservation-result-links">
          <a href="#1">Yeni Rezervasyon Yap</a>
          <a href="#2">Rezervasyonu Güncelle</a>
          <a href="#3">Rezervasyonu İptal Et</a>
        </div>

      </div>

      <PreviewBox />

    </div>
  )
}
