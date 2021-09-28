import React from 'react'
import { Helmet } from 'react-helmet'
import { classesBoxBorder, ExternalLink } from 'common'

export const Palmid = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | palmID</title>
        </Helmet>
    )

    const parseFasta = () => {
        const fastaInput = document.getElementById('fastaInput') as HTMLInputElement
        let fastaText = fastaInput.value

        var header_text
        var seq_text
        var parsed_seq_text 

        if ( fastaText.search(">") >= 0) {
            // Parse with header
            // Parse first sequence in case of multiple fasta
            fastaText = fastaText.split('>')[1]

            header_text = fastaText.split('\n')[0]
            header_text = '>' + header_text

            // rest is protein sequence
            seq_text = fastaText.split('\n')
            seq_text.shift()
            parsed_seq_text = seq_text.join()

        } else {
            // Parse without header
            header_text = '>Serratus_palmid'

            // All is protein sequence
            parsed_seq_text = fastaText

        }

        // Parse Fasta Sequence
        // remove all non alpha-characters
        parsed_seq_text = parsed_seq_text.replace(/[^A-Za-z]/g, '').toUpperCase()

        // Parsed Fasta Testing (Visual)
        var parsedFasta = header_text.concat('\n', parsed_seq_text)

        document.getElementById('faHeader')!.innerHTML = header_text
        document.getElementById('faSeq')!.innerHTML = parsed_seq_text
        document.getElementById('parsedFa')!.innerHTML = parsedFasta


    }

    const postFasta = () => {

    }

    return (
        <div className='min-h-screen w-full sm:bg-gray-100 py-4'>
            {headTags}
            <div className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
                <h1 className='text-3xl font-bold text-center'>palmID: Viral-RdRP Analysis </h1>
                <p className='my-3'>Sequence, in FASTA format</p>

                <form id='submissionForm'>
                    <div id='sequenceSec' className='form-item field textarea required'>
                        <textarea
                            id='fastaInput'
                            rows={4}
                            cols={72}
                            className='field-element'
                            placeholder='>Enter your sequence (DNA / Protein)'
                            aria-required='true'
                            onChange={parseFasta}></textarea>
                    </div>
                </form>

                <button
                    className='w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                    onClick={parseFasta}>
                    Analyze Sequence
                </button>

                <p>Parsed Fasta:</p>
                <p id='faHeader'> </p>
                <p id='faSeq'> </p>
                <p> ============ </p>
                <p> API Submission Fasta: </p>
                <p id='parsedFa' ></p>


            </div>
        </div>
    )
}
