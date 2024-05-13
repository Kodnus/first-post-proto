import React from "react";
import { useState } from "react";
import PromptInputComponent from "../components/PromptInputComponent";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

function NewPost() {
  const [industri, setIndustri] = useState("");
  const [tema, setTema] = useState("");
  const [formål, setFormål] = useState("");
  const [målgruppe, setMålgruppe] = useState("");
  const [længde, setLængde] = useState("");
  const [tone, setTone] = useState("");
  const [promovering, setPromovering] = useState("");
  const [callToAction, setCallToAction] = useState("");

  const [dataFromAPI, setDataFromAPI] = useState("");

  async function CallOpenAIAPI() {
    console.log("Hello from API in terminal");
    await fetch("https://api.openai.com/v1/chat/completions", {
      //-H "Content-Type: application/json" \
      //-H "Authorization: Bearer $OPENAI_API_KEY"

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        "Authorization": "Bearer " + API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: "system",
            content:
              "Du er en erfaren og verdenskendt profil indenfor at skrive fængende og velovervejede social media posts. Du er på nuværende tidspunkt Director of Communication, " +
              "i en virksomhed, hvor I får udbud fra andre virksomheder, der skal have lavet instagram posts. Det er dit job at lave disse opslag, " +
              "og du bliver typisk betalt 10.000dkk til 20.000dkk per opslag. Du deler ikke denne information med andre, men dette er dit økonomiske incitament for at lave opslagene." +
              "Hvert et ord du skriver er velovervejet, din grammatik er altid punktlig og korrekt og du sætter dig altid grundigt ind i dine kunders behov." +
              "Du skriver som dansker og forstår den danske kultur og de danske normer. Det betyder at du prøver at holde dig væk fra klichéer, men prøver at være empatisk i dine udtryk." +
              "Du skal ikke nævne målgruppen specifikt i det opslag du laver (med mindre det bliver nævnt specifikt i din ordre), men derimod tilpasse din strategi til målgruppen nå du laver opslaget",
          },
          {
            role: "user",
            content:
              "Du har fået et nyt udbud fra en virksomhed, og din ordre lyder således:" +
              "Min virksomhed er indenfor industrien vedrørende" +
              industri +
              "og opslaget skal handle om:" +
              tema +
              ". Formålet med opslaget er følgende: " +
              formål +
              " og den specifikke målgruppe er:" +
              målgruppe +
              ". Jeg vil gerne have du bruger en tone, der forholder sig til disse kriterier: " +
              tone +
              " og dertil vil jeg gerne have en længde på, " +
              længde +
              "karakterer." +
              "Der skal ikke være et call to action",
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
        top_p: 1,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setDataFromAPI(data.choices[0].message.content);
      });
  }
  return (
    <div className="flex justify-center pt-20 pb-20">
      <div className="w-[40rem] bg-[#18182a] rounded-xl pl-5 pr-5 pb-5">
        <h1 className="flex justify-center font-bold text-2xl p-3 pb-10 text-white">
          Udfyld formularen og generer et opslag
        </h1>
        <div className=" pb-2 flex flex-col gap-4">
          <div className="flex flex-row justify-around">
            <PromptInputComponent
              title="Din industri"
              textPlaceholder="Ex. Vinforhandler"
              textInput={industri}
              onChange={setIndustri}
              cols={30}
              rows={2}
            ></PromptInputComponent>
            <PromptInputComponent
              title="Målgruppe"
              textInput={målgruppe}
              textPlaceholder="Ex. Unge i alderen 28+"
              onChange={setMålgruppe}
              cols={30}
              rows={2}
            ></PromptInputComponent>
          </div>

          <div className="flex flex-row justify-center">
            <PromptInputComponent
              title="Hvad skal opslaget handle om?"
              textInput={tema}
              textPlaceholder="Ex. Vi har for nyligt valgt at lave et tilbud om onsdagen, hvor vores gæster kan købe tre glas vin for for 100 kr. Det skifter hver uge, men denne uge er det et glas rose fra Provence i Frankrig, et glas hvidvin fra Mosel i Tyskland og et glas rød Rioja fra Spanien. Gør opmærksom på, at glassene kan nydes i vores dejlige gårdhave i grønne omgivelser"
              onChange={setTema}
              cols={71}
              rows={5}
            ></PromptInputComponent>
          </div>

          <div className="flex flex-row justify-around">
            <PromptInputComponent
              title="Opslagets formål"
              textInput={formål}
              textPlaceholder="Ex. At gøre opmærksom på vores tilbud"
              onChange={setFormål}
              cols={30}
              rows={3}
            ></PromptInputComponent>
            <PromptInputComponent
              title="Tone"
              textInput={tone}
              textPlaceholder="Ex. En professionel tone, der er indbydende"
              onChange={setTone}
              cols={30}
              rows={3}
            ></PromptInputComponent>
          </div>
          <div className="flex flex-row justify-center">
            <PromptInputComponent
              title="Længde"
              textInput={længde}
              textPlaceholder="Ex. 500 karakterer"
              onChange={setLængde}
              cols={30}
              rows={2}
            ></PromptInputComponent>
          </div>
          <div className="flex flex-row justify-center w-auto pt-2">
            <button
              className="rounded-xl bg-[#1d97d9] h-10 w-[12rem] text-white font-semibold"
              onClick={CallOpenAIAPI}
            >
              Giv mig mit opslag
            </button>
          </div>
          {dataFromAPI !== "" && (
            <div className="w-full flex justify-center">
              <div className="w-[25rem] flex justify-center">
                <p className="text-white">{dataFromAPI}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewPost;
