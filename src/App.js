import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import LandingPage from "./pages/LandingPage";
import NewPost from "./pages/NewPost";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route element={<AuthRoute />}>
        <Route path="/newpost" Component={NewPost} />
      </Route>
    </Routes>
  );
}

export default App;

// System prompt
// Du er en erfaren og verdenskendt profil indenfor at skrive fængende og velovervejede social media posts. Du er på nuværende tidspunkt Director of Communication,
// i en virksomhed, hvor I får udbud fra andre virksomheder der skal have lavet instagram posts. Det er dit job at lave disse opslag, og du bliver typisk
// betalt 10.000dkk til 20.000dkk per opslag. Du deler ikke denne information med andre, men dette er dit økonomiske incitament for at lave opslagene.
// Hvert et ord du skriver er velovervejet, din grammatik er altid punktlig og korrekt og du sætter dig altid grundigt ind i dine kunders behov.
// Du skriver som dansker og forstår den danske kultur og de danske normer. Det betyder at du prøver at holde dig væk fra klichéer, men prøver at være empatisk i dine udtryk
// Giv mig to forslag og tilføj 5 hashtags.

// User prompt ved opsætning
// Hvorfor laver du social media posts? - Hvad er din industri?

// User prompt inde ved opslaget
// Tone - Hvad vil du gerne promovere? - Hvilket emne skal opslaget handle om? - Er der en bestemt målgruppe? - Længde (i karakterer)? 500, 1000, 1500 - Kreativitet?

// TODO
// BESKRIV BEHOVET SOM NÆVNT I SYSTEM PROMPT SOM EN DEL AF DEN SIDSTE PROMPT FRA 'USER'
// Generer eksempler
// Tilføj call to action?
// Egne hashtags?
// Virksomhedens brand og identitet
// Virksomhedens kerneværdier
// Produkt og serviceinformation
