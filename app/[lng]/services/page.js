"use client";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import ServiceDescCard from "@/components/ServiceDescCard/ServiceDescCard";
import React from "react";

const page = () => {
  const serviceCardData = [
    {
      title: 'Counseling Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In illum aperiam cum et corporis, fugiat repudiandae quis quae praesentium mollitia minima sunt ratione, repellat dolore adipisci neque, dignissimos molestias. Dignissimos.',
      logo: 'fa-solid fa-clipboard'
    },
    {
      title: 'Engineering Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In illum aperiam cum et corporis, fugiat repudiandae quis quae praesentium mollitia minima sunt ratione, repellat dolore adipisci neque, dignissimos molestias. Dignissimos.',
      logo: 'fa-solid fa-screwdriver-wrench'
    },
    {
      title: 'Manufacture and Supply of Equipment',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In illum aperiam cum et corporis, fugiat repudiandae quis quae praesentium mollitia minima sunt ratione, repellat dolore adipisci neque, dignissimos molestias. Dignissimos.',
      logo: 'fa-solid fa-industry'
    },
    {
      title: 'After Sale Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In illum aperiam cum et corporis, fugiat repudiandae quis quae praesentium mollitia minima sunt ratione, repellat dolore adipisci neque, dignissimos molestias. Dignissimos.',
      logo: 'fa-solid fa-wrench'
    }
  ]

  const serviceDescData = [
    {
      title: 'Counseling Services',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aspernatur quia id blanditiis laudantium corporis dolorum,incidunt cupiditate autem? Quos praesentium deserunt sed aconsequatur libero eligendi minus error consectetur tempora.', 
      items: [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      ]
    },
    {
      title: 'Engineering Services',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aspernatur quia id blanditiis laudantium corporis dolorum,incidunt cupiditate autem? Quos praesentium deserunt sed aconsequatur libero eligendi minus error consectetur tempora.', 
      items: [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      ]
    },
    {
      title: 'Manufacture and Supply of Equipment',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aspernatur quia id blanditiis laudantium corporis dolorum,incidunt cupiditate autem? Quos praesentium deserunt sed aconsequatur libero eligendi minus error consectetur tempora.', 
      items: [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      ]
    },
    {
      title: 'After Sale Services',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aspernatur quia id blanditiis laudantium corporis dolorum,incidunt cupiditate autem? Quos praesentium deserunt sed aconsequatur libero eligendi minus error consectetur tempora.', 
      items: [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      ]
    }
  ]
  
  return (
    <div className="flex flex-col mx-auto w-full justify-center items-center gap-20 mt-10">

      {/* Services Title */}

      <div className="flex w-full flex-col gap-2 self-center justify-center items-center">
        <div className="flex flex-row gap-3 w-full justify-center items-center">
          <div className="bg-[var(--contact-colour)] w-14 h-[2px]"></div>
          <span className="font-bold font-lato text-neutral-800 text-center text-4xl">
            Services
          </span>
          <div className="bg-[var(--contact-colour)] w-14 h-[2px]"></div>
        </div>
        <span className="font-lato text-center text-slate-700">What We Do</span>
      </div>

      {/* Services cards grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 mx-10 gap-4">

        { serviceCardData.map((item, index) => (
          <ServiceCard
            key={index}
            title={item.title}
            logo={item.logo}
            description={item.description}
          />
        ))}
        
      </div>

      {/* Services descriptions cards  */}

      <div className="grid bg-white shadow-sm drop-shadow-sm w-full border-neutral-100 border-[1px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-20 px-8 sm:px-20  gap-12">

        { serviceDescData.map((item, index) => (
          <ServiceDescCard
            key={index}
            title={item.title}
            description={item.description}
            items= {item.items}
          />
        ))}

      </div>
    </div>
  );
};

export default page;