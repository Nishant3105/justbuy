import ImageCard from '../../components/ImageCard'
const Offers = () => {
  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ImageCard
        title="Daily Essentials, Made Easy"
        image="home_card_1.jpg"
        description=""
        buttonText="Shop Now"
      />
      <ImageCard
        title="Care That Cares for You"
        image="home_card_2.jpg"
        description=""
        buttonText="Explore"
      />
      <ImageCard
        title="Farm Fresh Every Day"
        image="home_card_4.jpg"
        description=""
        buttonText="View"
      />
    </section>
  )
}

export default Offers