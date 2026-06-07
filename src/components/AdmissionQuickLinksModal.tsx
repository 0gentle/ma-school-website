import React from 'react';
import Modal from './Modal';
import { Calendar, Download, FileText, ArrowRight } from 'lucide-react';

interface AdmissionQuickLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  tab: 'documents' | 'deadlines' | 'faq';
  faqs: Array<{ id: string; question: string; answer: string; category: string }>;
}

export default function AdmissionQuickLinksModal({
  isOpen,
  onClose,
  tab,
  faqs
}: AdmissionQuickLinksModalProps) {
  
  const getTitle = () => {
    switch (tab) {
      case 'documents':
        return 'Required Admission Documents';
      case 'deadlines':
        return 'Enrollment Deadlines & Key Dates';
      case 'faq':
        return 'Frequently Asked Questions (FAQ)';
      default:
        return 'Information';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()}>
      {tab === 'documents' && (
        <div className="space-y-4">
          <p className="text-xs text-text-muted">
            Download the necessary admission packets and guidelines required to complete your student profile for the upcoming academic cycle.
          </p>

          <div className="space-y-2.5">
            {[
              { name: 'Admissions Prospectus & Catalog', size: '4.8 MB', icon: <FileText size={18} className="text-secondary" /> },
              { name: 'Middle & Senior Secondary Application Pack', size: '2.1 MB', icon: <FileText size={18} className="text-secondary" /> },
              { name: 'Confidential Teacher Evaluation Form', size: '920 KB', icon: <FileText size={18} className="text-secondary" /> },
              { name: 'Financial Aid & Scholarship request Form', size: '1.4 MB', icon: <FileText size={18} className="text-secondary" /> }
            ].map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded border border-surface-container hover:bg-neutral-50/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-secondary/5 border border-secondary/10">
                    {doc.icon}
                  </div>
                  <div>
                    <h5 className="font-semibold text-primary text-xs leading-none">{doc.name}</h5>
                    <span className="text-[10px] text-text-muted mt-1 inline-block">PDF Format • {doc.size}</span>
                  </div>
                </div>

                <a
                  href={`#download-${idx}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Simulating secure download of: ${doc.name}`);
                  }}
                  className="p-1.5 hover:bg-secondary-container/30 rounded text-secondary hover:text-primary transition-all flex items-center gap-1"
                  title="Download File"
                >
                  <Download size={14} />
                  <span className="text-[10px] font-mono">Download</span>
                </a>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-text-muted italic border-t border-surface-container pt-2.5">
            Note: All documents must be signed, rendered into clear PDF format, and submitted via the active Admissions form.
          </p>
        </div>
      )}

      {tab === 'deadlines' && (
        <div className="space-y-4">
          <p className="text-xs text-text-muted">
            Track key application milestones to guarantee review and priority consideration for academic scholarships.
          </p>

          <div className="relative border-l-2 border-secondary/30 ml-3.5 pl-5 space-y-4">
            {[
              { date: 'September 1, 2026', title: 'Admissions Loop Opens', desc: 'Fall regular applications catalog opens. Early inquiry starts.' },
              { date: 'November 15, 2026', title: 'Early Decision Deadline', desc: 'Early decision application materials and transcript submission due.' },
              { date: 'January 31, 2027', title: 'Regular Decision Deadline', desc: 'General pool registration cutoff. Primary evaluation starts.' },
              { date: 'March 15, 2027', title: 'Scholarship Audit Closure', desc: 'Completion of proof of income and merit assessment forms.' },
              { date: 'April 20, 2027', title: 'Admission Portals Dispatch', desc: 'Decisions sent. Accepted students can inspect packages.' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 bg-background rounded-full border-2 border-secondary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                </div>
                
                <div>
                  <span className="text-[100px] text-zinc-100 font-serif leading-none absolute -right-2 -top-10 -z-10 select-none font-bold opacity-30">
                    {idx + 1}
                  </span>
                  
                  <span className="font-mono text-[10px] font-semibold text-secondary tracking-wider block uppercase mb-0.5">
                    {item.date}
                  </span>
                  <h5 className="font-semibold text-primary text-xs mb-1">
                    {item.title}
                  </h5>
                  <p className="text-text-muted text-[11px] leading-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'faq' && (
        <div className="space-y-3">
          <p className="text-xs text-text-muted mb-2">
            Browse answers to popular logistical, educational, financial questions concerning student enrollment.
          </p>

          <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
            {faqs.map((f) => (
              <details
                key={f.id}
                className="group p-3 border border-surface-container rounded bg-surface-card hover:bg-neutral-50/50 transition-all [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <h5 className="text-xs font-semibold text-primary transition-colors group-hover:text-secondary pr-4">
                    {f.question}
                  </h5>
                  <ArrowRight
                    size={14}
                    className="text-text-muted shrink-0 transition-transform group-open:rotate-90"
                  />
                </summary>
                
                <p className="text-[11px] leading-relaxed text-text-muted mt-2 border-t border-surface-container pt-2">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="pt-3.5 border-t border-surface-container flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-xs font-semibold bg-primary text-on-primary rounded hover:bg-primary-container transition-all"
          id="close-quick-links"
        >
          Close View
        </button>
      </div>
    </Modal>
  );
}
