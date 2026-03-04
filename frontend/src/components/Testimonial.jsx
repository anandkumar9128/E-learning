import React from 'react'

const Testimonial = () => {
    const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://images.unsplash.com/photo-1608734265656-f035d3e7bcbf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <section className="py-[80px] text-center">
        <h2 className='text-[32px] mb-[30px] font-semibold text-[#8a4baf]'>What our students say</h2>
        <div className="flex flex-wrap justify-center gap-[30px]">
            {testimonialsData.map((testimonial) => (
                <div className="bg-white shadow-md p-[20px] rounded-[10px] w-[300px] flex flex-col items-center" key={testimonial.id}>
                    <div className="flex justify-center w-full mb-[15px]">
                        <img className='w-[80px] h-[80px] rounded-full object-cover' src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <p className='text-[15px] text-[#555] mb-[20px] italic text-center'>"{testimonial.message}"</p>
                    <div className="text-center mt-auto">
                        <p className='text-[16px] text-[#8a4baf] font-semibold mb-[2px]'>{testimonial.name}</p>
                        <p className='text-[14px] text-[#666]'>{testimonial.position}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}
export default Testimonial