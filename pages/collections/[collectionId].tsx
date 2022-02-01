import React, { FC, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { MarketplaceModule, NFTModule, ThirdwebSDK } from '@3rdweb/sdk'
import { client } from '../../lib/sanityClient'

import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import Header from '../../components/Header'
import { CgWebsite } from 'react-icons/cg'
import NFTCard from '../../components/NFTCard'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection: FC = () => {
  const router = useRouter()
  const { provider } = useWeb3()
  const marketPlaceId: string = '0xD151bc870F0947F2058f41aE934f865EBB0F4535'
  const { collectionId } = router.query as { collectionId: string }
  const [collection, setCollection] = useState<any>({})
  const [nfts, setNfts] = useState<any>([])
  const [listings, setListings] = useState<any>([])

  // https://eth-rinkeby.alchemyapi.io/v2/wRf1X_7QaIXMnrMqt2fL4IrkqXJOvaL9

  const fetchCollectionData = async (
    sanityClient = client,
    Id: string = collectionId
  ) => {
    const query = `*[_type == "marketItems" && contractAddress == "${Id}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded, createdBy, contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->, description
    }`
    const collectionData = await sanityClient.fetch(query)

    setCollection(collectionData[0])
  }

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(provider.getSigner())
    const nftModule: NFTModule = sdk.getNFTModule(collectionId)

    return nftModule
  }, [provider])

  const marketplaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(provider.getSigner())

    const marketPlaceModule: MarketplaceModule =
      sdk.getMarketplaceModule(marketPlaceId)

    return marketPlaceModule
  }, [provider])

  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()

      setNfts(nfts)
    })()
  }, [nftModule])

  useEffect(() => {
    if (!marketplaceModule) return
    ;(async () => {
      setListings(await marketplaceModule.getAllListings())
    })()
  }, [marketplaceModule])

  useEffect(() => {
    fetchCollectionData()
  }, [collectionId])

  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : 'https://via.placeholder.com/200'
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : 'https://via.placeholder.com/200'
            }
            alt="profile image"
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by{' '}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ''}
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}.5K
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      <div className="flex flex-wrap ">
        {nfts.map((nftItem: any, id: number) => (
          <NFTCard
            key={id}
            nftItem={nftItem}
            title={collection?.title}
            listings={listings}
            collectionId={collectionId}
          />
        ))}
      </div>
    </div>
  )
}

export default Collection
