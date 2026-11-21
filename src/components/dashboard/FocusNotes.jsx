
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Clock3,
} from 'lucide-react';

const focusSlides = [
  {
    title: 'Make today count.',
    description: 'A little focus goes a long way.',
    status: 'NEXT UP',
    task: 'Design landing page',
    progress: 62,
    type: 'next',
  },
  {
    title: 'Small steps, big progress.',
    description: 'Keep your priorities in view.',
    status: 'IN PROGRESS',
    task: 'Fix navigation',
    progress: 67,
    type: 'progress',
  },
  {
    title: 'Celebrate the wins.',
    description: 'Every completed task moves you forward.',
    status: 'COMPLETED',
    task: 'Onboarding copy',
    progress: 100,
    type: 'completed',
  },
];

function FocusNotes() {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = focusSlides[activeSlide];

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? focusSlides.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setActiveSlide((current) =>
      (current + 1) % focusSlides.length
    );
  };

  return (
    <section
      className="focus-notes"
      aria-label="Focus notes carousel"
    >
      <div className="focus-content">
        <div className="focus-copy">
          <div className="focus-meta">
            <span>FOCUS NOTES</span>
            <span>
              {String(activeSlide + 1).padStart(2, '0')} / 03
            </span>
          </div>

          <h2>{currentSlide.title}</h2>
          <p>{currentSlide.description}</p>

          <div className="focus-indicators">
            {focusSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  activeSlide === index ? 'true' : undefined
                }
                className={
                  activeSlide === index ? 'indicator active' : 'indicator'
                }
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="focus-preview">
          <div className="preview-shadow" />

          <div className="preview-card">
            <div className="preview-icon">
              {currentSlide.type === 'completed' ? (
                <Check size={15} />
              ) : currentSlide.type === 'progress' ? (
                <Clock3 size={15} />
              ) : (
                <Check size={15} />
              )}
            </div>

            <div className="preview-details">
              <span>{currentSlide.status}</span>
              <strong>{currentSlide.task}</strong>

              <div className="preview-progress">
                <div className="preview-progress-track">
                  <div
                    className="preview-progress-value"
                    style={{
                      width: `${currentSlide.progress}%`,
                    }}
                  />
                </div>

                <span>{currentSlide.progress}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="focus-controls">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FocusNotes;
