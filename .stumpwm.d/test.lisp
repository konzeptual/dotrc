;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; Testing new stuff
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defcommand stardict-translate () ()
  "Translate visually selected word."
  (run-shell-command "stardict \"`xclip -o`\""))
(define-key *root-map* (kbd "d")    "stardict-translate")

;; (defcommand battery () ()
;;   "Show battery status."
;;   (echo-string (current-screen) (string-trim '(#\Space) (run-shell-command "acpi" t))))
