import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export const ChaptersDrawerList = () => (
            <ul className='ChapterList flex flex-col gap-4'>
                <li>
                    <Collapsible>
                        <CollapsibleTrigger className="w-full">
                            <div className="flex w-full justify-between hover:bg-amber-200 p-2 rounded-md">
                                <p>Chapter One</p>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <ul className='PageList flex flex-col p-4 gap-4'>
                                <li>
                                    <p>page one</p>
                                </li>
                                <li>
                                    <p>page two</p>
                                </li>
                                <li>
                                    <p>page three</p>
                                </li>
                            </ul>
                        </CollapsibleContent>
                    </Collapsible>
                </li>
            </ul> 
)