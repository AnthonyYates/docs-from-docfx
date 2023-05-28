import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Inter } from 'next/font/google'
import ArticlePage from '@/Components/ArticlePage'
import {ParamsObject, DataObject} from '../lib/docs'
import getDocs from '../lib/docs'
import {readDocFile} from '../lib/docs'
import * as fs from "fs-extra";

interface IParams extends ParsedUrlQuery {
  slug: string[]
  locale: string
  filePath: string
}

const inter = Inter({ subsets: ['latin'] })

export default function Docs(props : {content: string, slug: string, locale: string}) {

  console.log(props);

  debugger;
  return (
    <ArticlePage />
    )
}

// implement getStaticPaths using Typescript

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const slug = params?.slug as string[];

  // Calling getDocs again is not great, but ending up caching it in Docs lib seems to be the only way to solve the double lookup issue
  // get params for the docs where slugs match, then populate page props with the data
  const docs = await getDocs();
  const paramsObject = docs?.data.find((doc) => {
    if(doc.params !== undefined) {
      const paramSlug = doc.params.slug as string[];
      return paramSlug.join("/") === slug.join("/");
    }
  });

  if(paramsObject?.params?.filePath === undefined || paramsObject?.params?.filePath.length === 0) {
    console.log("Params Object: ", JSON.stringify(paramsObject));
  }  // this should never happen, but if it does, we need to know about it. The next line will throw an exception.

  const data = await readDocFile(paramsObject?.params.filePath as string);
  
  return { props: { content: data, slug: slug, locale: paramsObject?.params.locale ?? "en" } };

};
 
export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
  const docs = await getDocs();
  
  const paths: { params: ParsedUrlQuery }[] = [];
  
  // Add slug paths to the array
  docs?.data.forEach((doc) => {
    paths.push({ 
      params: {
        slug: doc.params.slug as string[]
      } 
    });
  });

  return { paths, fallback: false };
};