import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="container py-5">
      {/* Header Sezione */}
      <section className="text-center mb-5">
        <h1 className="display-4 fw-bold text-dark">Chi Siamo</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
          Benvenuti in <strong>Pet Care</strong>, dove l'amore per gli animali incontra l'affidabilità della tecnologia.
        </p>
      </section>

      {/* Storia e Missione */}
      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <h2 className="h3 mb-4">La nostra storia</h2>
          <p>
            <strong>Pet Care</strong> nasce dal cuore di chi vive ogni giorno circondato da code che scodinzolano e fusa amorevoli. 
            Sappiamo che il tuo animale domestico non è solo un "pet", ma un membro della famiglia a tutti gli effetti.
          </p>
          <p>
            La nostra avventura è iniziata con una domanda semplice: 
            <em> "Come possiamo garantire ai nostri amici a quattro zampe la migliore assistenza possibile, anche quando non possiamo essere presenti?"</em>
          </p>
        </div>
        <div className="col-lg-6 text-center">
          {/* Placeholder per un'immagine. Puoi sostituire l'URL con una tua foto */}
          <img 
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600&auto=format&fit=crop" 
            alt="Cane e gatto" 
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>
      </div>

      {/* Cosa Facciamo - Card */}
      <section className="bg-light p-5 rounded-4 mb-5">
        <h2 className="text-center mb-4">Cosa facciamo</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body">
                <div className="text-primary mb-3 h1">🐶</div>
                <h5 className="card-title fw-bold">Sitter Perfetto</h5>
                <p className="card-text text-muted">Profili verificati e recensiti per garantire massima tranquillità ad ogni proprietario.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body">
                <div className="text-primary mb-3 h1">📅</div>
                <h5 className="card-title fw-bold">Gestione su Misura</h5>
                <p className="card-text text-muted">Dalle passeggiate ai soggiorni prolungati, ogni servizio è personalizzato sulle esigenze del pet.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body">
                <div className="text-primary mb-3 h1">🛡️</div>
                <h5 className="card-title fw-bold">Sicurezza</h5>
                <p className="card-text text-muted">Un sistema di comunicazione costante per farti sentire sempre vicino al tuo amico.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valori e Citazione */}
      <section className="row justify-content-center text-center">
        <div className="col-md-8">
          <figure className="mb-5">
            <blockquote className="blockquote">
              <p className="fst-italic h2">
                "La qualità della vita di un animale domestico riflette la dedizione di chi se ne prende cura."
              </p>
            </blockquote>
            <figcaption className="blockquote-footer mt-2">
              Il Team di <cite title="Source Title">Pet Care</cite>
            </figcaption>
          </figure>
          
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Link className="btn btn-primary btn-lg px-4 me-md-2" to="/register">Registrati ora</Link>
            <Link className="btn btn-outline-secondary btn-lg px-4">I nostri servizi</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;